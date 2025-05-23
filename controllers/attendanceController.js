const Attendance = require('../models/attendanceModel');

// Create
exports.createAttendance = async (req, res) => {
  try {
    const newAttendance = await Attendance.create(req.body);
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all
exports.getAllAttendance = async (req, res) => {
  try {
    const data = await Attendance.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read one
exports.getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findByPk(req.params.id);
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ error: 'Attendance record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateAttendance = async (req, res) => {
  try {
    const [updated] = await Attendance.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRecord = await Attendance.findByPk(req.params.id);
      res.json(updatedRecord);
    } else {
      res.status(404).json({ error: 'Attendance record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Attendance deleted' });
    } else {
      res.status(404).json({ error: 'Attendance record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};