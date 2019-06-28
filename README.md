# Description
The Allostasis game is a project developed for Dr. David E Melnikoff. This online experiment was created to help model the allostatic behavior of humans by collecting data on how people play a simple game where players move around a grid to eat and drink for survival. This project was developed by the Sandbox organization at Northeastern University.

# Code/Development
This game was developed using React. 
Use `npm start` to start a development server for the front end.

# Deployment
Pushing to GitHub deploys the app to [Zeit Now](https://zeit.co/now). The master branch is production. Zeit builds the app with now.json, which uses the `now-build` script inside package.json to build the React app for production. Zeit handles routing by hosting static files at `/static/` and then routes every other url to React's compiled index.html.

# Contributing
The Allostasis Game is an open source project and would greatly appreciate any contributors. Please reach out to jeevanantham.a@husky.neu.edu to find out how to get involved!

The Allostasis Game is a [Sandbox](https://sandboxneu.com) project.
