
import CheckLog from '../models/CheckLog.js';
import Endpoint from '../models/Endpoint.js';

import mongoose from 'mongoose';
import { performCheck } from '../utils/cron.js';



export const createEndpoint = async (req, res) => {

  try {
    const endpoint = await Endpoint.create({
      ...req.body,
      user: req.user.userId,
    });
    res.status(201).json(endpoint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyEndpoints = async (req, res) => {
  try {
    const endpoints = await Endpoint.find({ user: req.user.userId });
    res.json(endpoints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!endpoint) return res.status(404).json({ message: 'Not found' });
    res.json(endpoint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!endpoint) return res.status(404).json({ message: 'Not found' });
    res.json(endpoint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEndpoint = async (req, res) => {
  try {
    const endpoint = await Endpoint.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!endpoint) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getEndpointLogs = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid endpoint ID' });
  }

  try {
    const logs = await CheckLog.find({ endpoint: id })
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: error.message });
  }
};


export const runManualCheck = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid endpoint ID' });
    }

    const endpoint = await Endpoint.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!endpoint) {
      return res.status(404).json({ message: 'Endpoint not found' });
    }

    await performCheck(endpoint);

    res.json({ message: 'Manual check triggered successfully' });

  } catch (error) {
    console.error('Manual check error:', error);
    res.status(500).json({ message: error.message });
  }
};