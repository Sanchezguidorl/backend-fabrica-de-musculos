const Button = require('../models/button.model.js');

const getButtons = async (req, res) => {
    try {
        const buttons = await Button.find();
        if (!buttons) return res.status(204).json({ success: true, message: 'Collection is empty' });

        return res.status(200).json(buttons);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error when entering button data' });
    }
};

const createButton = async (req, res) => {
    const textInput = req.body.textInput;
    const urlInput = req.body.urlInput;
    console.log(req.body);
    if (!textInput || !urlInput) {
        return res.status(400).json();
    }
    try {
        const newButton = new Button({ text: textInput, url: urlInput });
        const button = await newButton.save();

        return res.status(201).json({ success: true, message: 'Button successfully added' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Button creation failed' });
    }
};

const deleteButton = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'Bad request' });
    }
    try {
        const deletedButton = await Button.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: 'Image was deleted' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed button deletion', error: error.message });
    }
};

module.exports = { getButtons, createButton, deleteButton };