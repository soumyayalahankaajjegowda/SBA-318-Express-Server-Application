const express = require('express');
const uuid = require('uuid');
const router = express.Router();

//adding the Members.js file here

const members = require('../../Members');

//Route get all members

router.get('/',(req, res)=> res.json(members));

//get single member
router.get('/:id',(req,res) =>{
    const found = members.some(member => member.id=== parseInt(req.params.id));
    if(found){
        res.json(members.some(member => member.id=== parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `no member with the id of ${req.params.id}`});
    }
    });

    //create a member

    router.post('/',(req,res) => {
        const newMember = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            status: 'active'
        }

        if (!newMember.name || !newMember.email) {
            return res.status(400).json({ msg: 'please include a name and email' });
        }
        members.push(newMember);
        res.json(members); //storing in json
        //res.redirect('/') //will show in front page
    })

    //update Member
    router.put('/:id', (req, res) => {
        const found = members.some(member => member.id === parseInt(req.params.id));
        
    })
