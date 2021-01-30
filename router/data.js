const express = require('express');
const {JsonResponse, checkType, checkCondition, ress} = require('../shared/method');
const router = express.Router();

const data = {
    name: "Elijah Adedamola",
    github: "@fadaco",
    email: "adedamola.elijah@gmail.com",
    mobile: "08059111123",
    twitter: "@fadaco4real"
}

const data2 = {
    rule: {
      field: "missions",
      condition: "gte",
      condition_value: 30
    },
    data: {
      name: "James Holden",
      crew: "Rocinante",
      age: 34,
      position: "Captain",
      missions: 45
    }
  }

  

 
  

router.get('/', async (req, res)=> {
    await res.status(200).send(JsonResponse("success", "My Rule-Validation API", data));
});

const sendValue = (req, res) => {
    try {
        if (req.body.data[req.body.rule.field] === '' || req.body.data[req.body.rule.field] === null) {
            return res.status(400).send(JsonResponse("error", `${req.body.rule.field} is required.`, null))
        }
       else if(!req.body.data[req.body.rule.field]) {
        return res.status(400).send(JsonResponse("error", `field ${req.body.rule.field} is missing from the data.`, null))
        } else if((typeof req.body.rule.condition_value !== typeof req.body.data[req.body.rule.field]) && req.body.rule.condition !== 'contains') {
            return res.status(400).send(JsonResponse("error", `${req.body.rule.field} should be ${checkType(typeof req.body.rule.condition_value)} ${typeof req.body.rule.condition_value}.`, null))
        } else {
             if(checkCondition(req.body.data[req.body.rule.field], req.body.rule.condition, req.body.rule.condition_value)){
              return res.status(200).send(JsonResponse("success", `field ${req.body.rule.field} successfully validated.`, ress("success", req.body.rule.field, req.body.data[req.body.rule.field], req.body.rule.condition, req.body.rule.condition_value)))
            } else {
                return res.status(400).send(JsonResponse("error", `field ${req.body.rule.field} failed validation.`, ress("error", req.body.rule.field, req.body.data[req.body.rule.field], req.body.rule.condition, req.body.rule.condition_value)))
            }
            
        }

    } catch(err){
        return res.status(400).send(JsonResponse("error", `field ${req.body.rule.field} is missing from the data.`, null))
    }
}


router.post('/validate-rule', (req, res) => {
    if(req.body.rule.field.includes('.')){
        let value = req.body.rule.field.split('.');
        if(typeof req.body.data[value[0]] == 'object') {
            if(req.body.data[value[0]][value[1]] === '' || req.body.data[value[0]][value[1]] === null) {
                return res.status(400).send(JsonResponse("error", `${req.body.rule.field} is required.`, null))
            }
             else if(!req.body.data[value[0]][value[1]]){
                return res.status(400).send(JsonResponse("error", `field ${req.body.rule.field} is missing from the data.`, null))

             } else if((typeof req.body.rule.condition_value !== typeof req.body.data[value[0]][value[1]]) && req.body.rule.condition !== 'contains' ){
                return res.status(400).send(JsonResponse("error", `${req.body.rule.field} should be ${checkType(typeof req.body.rule.condition_value)} ${typeof req.body.rule.condition_value}.`, null))
    

             } else {
                 if(checkCondition(req.body.data[value[0]][value[1]], req.body.rule.condition, req.body.rule.condition_value)){
                    return res.status(200).send(JsonResponse("success", `field ${req.body.rule.field} successfully validated.`, ress("success", req.body.rule.field, req.body.data[value[0]][value[1]], req.body.rule.condition, req.body.rule.condition_value)))
                 } else {
                    return res.status(400).send(JsonResponse("error", `field ${req.body.rule.field} failed validation.`, ress("error", req.body.rule.field, req.body.data[value[0]][value[1]], req.body.rule.condition, req.body.rule.condition_value)))

                 }
             }

        } else {
            sendValue(req, res);
        }
    } else {
        sendValue(req, res)
    }
   
   
});

module.exports = router;