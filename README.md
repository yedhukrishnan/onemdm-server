[![Code Climate](https://codeclimate.com/github/multunus/one-mdm/badges/gpa.svg)](https://codeclimate.com/github/multunus/one-mdm)

# One MDM

> :warning: This project is no longer maintained. Check out the upcoming improved version of OneMDM project here: [OneMDM Server](https://github.com/multunus/onemdm-server) 

## What is One MDM?

One MDM is an open source Mobile Device Management (MDM) solution. It can be used to manage Android devices registered to the server after installing the [one-mdm-client](https://github.com/multunus/one-mdm-client) application. 

You can see the live demo of the server here: [One MDM Server](https://onemdm.herokuapp.com). You can either create an account or sign in using default username `admin` and password `adminadmin`.

![devices](https://raw.githubusercontent.com/multunus/one-mdm/master/screenshots/onemdm_devices.png)

## Documentation & Support 
 * We track [issues and bugs](https://github.com/multunus/one-mdm/issues) in Github
 * Follow [@multunus](https://twitter.com/multunus) on Twitter for news and updates

## How to set up One MDM?

Refer the Wiki for setting up the server: [Deploying One MDM Server](https://github.com/multunus/one-mdm/wiki/Deploying-One-MDM-Server)

Also the client application to be installed in the android device has to be built with necessary configurations to point to the server (Configuration details can be found on the [one-mdm-client](https://github.com/multunus/one-mdm-client) page).

Once the application is installed in the android device, it gets registered in the server and starts sending heartbeats.

## How to use One MDM?

One MDM server can be used to do the following:

* **Check the device disk space**: One MDM server can be used to check the free/used disk space in the device. Once you click on the `Check Disk Space` button, the server creates a script with command to execute on that device. Once the script is delivered to the device, the device executes the script and sends the status (success or failure) and result back to the server (See the screenshots below).

![scripts](https://raw.githubusercontent.com/multunus/one-mdm/master/screenshots/onemdm_scripts.png)
![output](https://raw.githubusercontent.com/multunus/one-mdm/master/screenshots/onemdm_output.png)

* **Execute arbitrary shell scripts on the device**: You can execute shell scripts on your device through One MDM. Once you click on `Run Script` button on the Devices page, you'll be taken to a new page where you can create a script to run on the device. If the device is rooted, you can also run commands which requires superuser permission by checking `Requires superuser permission`. Note that you may have to authorize your application for running superuser commands. **Some commands may cause damage to the device when used improperly. Read more about that here: [Script Execution](https://github.com/multunus/one-mdm/wiki/Script-Execution)**

## How to contribute to One MDM?

One MDM is still under construction! It is purely an open source project. If you find any bugs, you can help us by raising issues in Github. Also, you can contribute to the project by sending pull requests:

* Fork the project on Github
* Create a topic branch for your changes
* Ensure that you provide *documentation* and *test coverage* for your changes (patches won't be accepted without)
* Ensure that all tests pass (`npm test`)
* Create a pull request on Github 

