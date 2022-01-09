# MRI Pictures Processing App

This project is an assigment for one of the companies, where the app supposed to show more of the valid code, configurations and task performance, than design and styles.

The task is to build a data model and a simple GUI for creating configurations for this image processing software package. It should allow any valid combination of inputs and steps to be created. In the GUI, the user shall be able to configure two things:

1. input image types to use (a single T1 image, a single FLAIR image, or an image pair with both T1 and FLAIR images) and
2. which steps should be run given the input images.
 

The user must not be able to create invalid configurations. Configurations examples were given as a separate file. After making the choices, the user can save the configuration, which is a plain text configuration file that can be given as input to the image processing software package when running it. The configuration file must be in a machine-readable format, which is well suited for parsing automatically by the software package (in case of this app, just a list of steps in the order). The configuration file is designed in a way that the software package reading it knows what input image types to use and which steps to run sequentially in a valid order.

## Deployment

App is deployed and running on 
[https://mri-processing-images.herokuapp.com/](https://mri-processing-images.herokuapp.com/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.