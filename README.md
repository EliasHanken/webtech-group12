# webtech-group12

The intention with this project is to create a webpage
for a bike renting company located in Ålesund

To run this webpage with the backend you need to open
the webpage with this link:
https://group12-bike-rental.netlify.app/index.html
This will the work if the server is live. 
You must also be connected to NTNU network or use a 
VPN to connect to it.
The backend on the server is compiled to a jar file which then is accessed
by the system on startup and ran as a service on the system. (Our backend is stored on
the linux server on NTNU with the corresponding ip 10.212.27.6).
The status of the app can be shown by "systemctl status krrr-app".
The service can be manipulated with "systemctl start/stop krrr-app" if needed.

If you want to run the frontend only all you need to do
is open the project in an IDE and open it from there or
open the index file from the pulled folder. The Carousel
will not be visible however since it connects to the backend.



