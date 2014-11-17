[![Build Status](https://travis-ci.org/multunus/one-mdm.svg?branch=master)](https://travis-ci.org/multunus/one-mdm) [![Code Climate](https://codeclimate.com/github/multunus/one-mdm/badges/gpa.svg)](https://codeclimate.com/github/multunus/one-mdm)

# One MDM

## What is One MDM?

One MDM is an open source Mobile Device Management (MDM) solution. It can be used to manage Android devices registered to the server after installing the [one-mdm-client](https://github.com/multunus/one-mdm-client) application. You can see the live demo of the server here: [One MDM Server](http://onemdm.herokuapp.com/)

![devices](https://raw.githubusercontent.com/multunus/one-mdm/master/screenshots/onemdm_devices.png)

## Documentation & Support 
 * We track [issues and bugs](https://github.com/multunus/one-mdm/issues) in Github
 * Follow [@multunus](https://twitter.com/multunus) on Twitter for news and updates

## How to set up One MDM?

In order to use One MDM, you have to host this One MDM server. For that, the server needs to have Node JS and npm installed in it. In a linux server, you can install them by running the commands:

``` bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

For alternate installation options, see this link: [How To Install Node.js on an Ubuntu 14.04 server](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)

Alternatively, you can also host the app in Heroku: [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

Also the client application to be installed in the android device has to be built with necessary configurations to point to the server (Configuration details can be found on the [one-mdm-client](https://github.com/multunus/one-mdm-client) page).

Once the application is installed in the android device, it gets registered in the server and starts sending heartbeats.

## How to use One MDM?

One MDM server can be used to do the following:

* **Check the Device Disk Space**: One MDM server can be used to check the free disk space available in the device. Once you click on the `Check Disk Space` button, the server creates a script with command to execute on that device. Once the script is delivered to the device, the device executes the script and sends the status (success or failure) and result back to the server (See the screenshots below).

![scripts](https://raw.githubusercontent.com/multunus/one-mdm/master/screenshots/onemdm_scripts.png)
![output](https://raw.githubusercontent.com/multunus/one-mdm/master/screenshots/onemdm_output.png)

## How to contribute to One MDM?

One MDM is still under construction! It is purely an open source project. If you find any bugs, you can help us by raising issues in Github. You can also contribute to the project by sending pull requests.
