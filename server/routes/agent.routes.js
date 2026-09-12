const express = require('express');
const { runAgent } = require('../services/agent.service');
const router = express.Router();

router.post('/chat', async (req,res) => {
  try {
    const sessionId = String(req.body?.sessionId || 'demo-session');
    const message = String(req.body?.message || '').trim();
    if (!message) return res.status(400).json({success:false,message:'Message is required'});
    const result = await runAgent({sessionId,userMessage:message});
    res.json({success:true,...result});
  } catch (error) {
    console.error('Agent error:',error);
    res.status(500).json({success:false,message:error.message || 'Agent error'});
  }
});

module.exports = router;
