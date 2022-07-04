# SmartPlantApp

React Native App I written as Engineering Thesis together with 3 other developers. Two of us was creating frontend, and two backend. 
I was responsible for frontend. Additionally, I have created designs of the entire application.

This is the first React App I've ever made. I am aware of that this project is not perfect. 

## What is it about?

The SmartPlant application is equipped with basic information about plant care. Additionally, the user is provided with soil moisture monitoring, which is realized by Arduino moisture sensors. The user has also at his disposal encyclopedia of 406 plant species, where can view information about their care of them. The goal would be to automate the process of planning care activities, so that the user would receive notifications regarding the necessary steps that need to be taken. Currently, monitoring is on the user's side, and the app allows the user to structure and organise observations and information about plants. It also allows you to see proper humidity parameters for particular species and gain knowledge about them.

### Purpose

The SmartPlant app is designed to make caring for potted plants easier. Nowadays there is an increasingly popular trend to keep live plants at home. 
Many people now have plants in the apartment for aesthetic reasons and are not necessarily familiar with taking care of them. The owners of live plants do not
usually have the knowledge about their flowers and often do not have the time to acquire this knowledge.

### Used Technologies

To create frontend side we used React Native and JavaScript. 

Backend was written in Node.js. 

Database is created in MongoDB and the data for it 
was taken from plant encyclopedia. The data preparation process involved converting text using Python with regular expressions. 
JSON files were created from the plain text in an automated manner.
