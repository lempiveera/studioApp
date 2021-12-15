# StudioApp
## App idea
The main idea of this app is to help a friend group to know where everyone is at the moment. When opening the app, theres 4 tabs, 3 for different studios,
and one for location purposes. On the studio tabs, user can add themself present by adding themself on the list, and remove themself when they leave. With this
everyone using the app can instantly see who is present, and where. This removes the need for messaging eachother "hey is anyone upstairs?" etc. In the location page,
user can see their own location, and calculate their distance to N10 (where two of the studios are) or to sumu (third studio). In the background, the app is
checking the users location every minute, and if the user is within 500m of either of the locations, user will get an notification that they are within 500m of
either N10 or sumu. This is how the app is currently working, in future development the location page is going to be removed, its currently there only for developing
purposes. 
## How to try out the app
Clone this repository. Run npm install or yarn install in the project folder. Install expo app on your phone (from app store, or google play). Make sure your computer
and mobile device are in the same network. Run expo start on your terminal. Using the expo app, read the QR-code and that should open the app on your phone. 
## Technologies
The app is build with expo. The components are mostly build with react-native's or expo's own libraries. Styling is done with react-native. Calculating distance is done
with geolibs getDistance function. Notifications are using expo-notifications, and currently they are running only locally. Location is using expo-location. The database
in use is Firebase realtime database. 
