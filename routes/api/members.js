const express = require('express');
const uuid = require('uuid');
const router = express.Router();

//adding the Members.js file here

const members = require('../../Members');

//Route get all members

router.get('/',(req, res)=> res.json(members));

//get single member by id
router.get('/:id',(req,res) =>{
    //use find() to get the member object
    const member = members.find(member => member.id === parseInt(req.params.id)); //finds and returns the actual member object if it exists.

    if(member){
        res.json(member); //return the member object
    } else {
        res.status(400).json({msg: `no member with the id of ${req.params.id}`});
    }
    });

    //create a member

    router.post('/',(req,res) => {
        const newMember = {
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            status: 'active'
        };

        // check if name and email is provided
        if (!newMember.name || !newMember.email) {
            return res.status(400).json({ msg: 'please include a name and email' });
        }

        members.push(newMember);  // add new member to the array

       // res.json(members); //storing in json // return the updated member list
        res.redirect('/'); //will show in front page
    });

    //update Member
    router.put('/:id', (req, res) => {
        const found = members.some(member => member.id === parseInt(req.params.id));

        if (found) {
            const updMember = req.body;
            members.forEach(member => {
                if (member.id === parseInt(req.params.id)) {
                    member.name = updMember.name ? updMember.name : member.name;
                    member.email = updMember.email ? updMember.email : member.email;

                    res.json({ msg: 'Member update', member });
    
                }

            });
        } else {
            res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
        }
    });

    // Delete Member
    router.delete('/:id', (req, res) => {
        const found = members.some(member => member.id === parseInt(req.params.id));

        if (found) {
            res.json({msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))

            });
        } else {
            res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
        }
    });

    module.exports = router;
