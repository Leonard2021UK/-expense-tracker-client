# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


#When
#Create the docker group.
sudo groupadd docker

#Add the user to the docker group.
sudo usermod -aG docker $(whoami)
#Log out and log back in to ensure docker runs with correct permissions.
#Start docker.
sudo service docker start

#Git hub resources
https://github.com/react-keycloak/react-keycloak/blob/master/packages/web/README.md
https://github.com/react-keycloak/react-keycloak-examples/tree/master/examples/react-router/src/utils
https://github.com/dasniko/keycloak-reactjs-demo/blob/master/src/services/UserService.js
#Web pages
https://cagline.medium.com/authenticate-and-authorize-react-routes-component-with-keycloak-666e85662636
https://extendsclass.com/typescript-to-javascript.html

#Export keycloak setup
./bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=./exports/keycloack-realm-export.json -Djboss.http.port=8888 -Djboss.https.port=9999 -D
jboss.management.http.port=7777

https://stackoverflow.com/questions/42186537/resources-scopes-permissions-and-policies-in-keycloak

#if we have a custom login page, set property bearer-only=TRUE in appliction.properties this will not direct to keycloak login page
https://keycloak.discourse.group/t/securing-speing-boot-restful-api-and-react-js/2848

#Import keycloak setup
./bin/standalone.sh -Dkeycloak.migration.action=import -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=./exports/keycloack-realm-export.json -Dkeycloak.migration.strategy=OVERWRITE_EXISTING -Djboss.http.port=8888 -Djboss.https.port=9999 -Djboss.management.http.port=7777

#check used port binding by Jboss keycloak
grep port standalone/configuration/standalone.xml

#The Ultimate Guide to handling JWTs on frontend clients (GraphQL)
https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_persist

#Spring Boot + React: JWT Authentication with Spring Security
https://www.bezkoder.com/spring-boot-react-jwt-auth/
https://www.bezkoder.com/spring-boot-refresh-token-jwt/
https://www.bezkoder.com/react-refresh-token/

#How to Get SSL HTTPS for Localhost
https://www.section.io/engineering-education/how-to-get-ssl-https-for-localhost/

#Importing an existing SSL key/certificate pair into a Java keystore
https://blog.jgc.org/2011/06/importing-existing-ssl-keycertificate.html

#package json script start
"start": "HTTPS=true SSL_CRT_FILE=localhost.pem SSL_KEY_FILE=localhost-key.pem react-scripts start",

#The Most Common Java Keytool Keystore Commands
https://www.sslshopper.com/article-most-common-java-keytool-keystore-commands.html
https://www.thomasvitale.com/https-spring-boot-ssl-certificate/

#How to use HTTPS for local development
https://web.dev/how-to-use-local-https/
https://blog.bitsrc.io/using-https-for-local-development-for-react-angular-and-node-fdfaf69693cd

#SSL certificates "missing private key" in Chrome
https://superuser.com/questions/1457044/ssl-certificates-missing-private-key-in-chrome

#ERROR handling in a restAPI
https://reflectoring.io/bean-validation-with-spring-boot/
https://reflectoring.io/spring-boot-exception-handling/

#Design patterns
https://howtodoinjava.com/design-patterns/creational/builder-pattern-in-java/

#ERROR handling in a restAPI
https://reflectoring.io/bean-validation-with-spring-boot/
https://reflectoring.io/spring-boot-exception-handling/


#Bean validation
https://reflectoring.io/bean-validation-with-spring-boot/#validating-programmatically
https://medium.com/@jovannypcg/understanding-springs-controlleradvice-cd96a364033f

#Java Exception: get detailMessage only
https://stackoverflow.com/questions/33825693/java-exception-get-detailmessage-only

#MapsStruct
https://stackabuse.com/guide-to-mapstruct-in-java-advanced-mapping-library/

#Ultimate Guide to Implementing equals() and hashCode() with Hibernate
https://thorben-janssen.com/ultimate-guide-to-implementing-equals-and-hashcode-with-hibernate/

#Spring Profiles
https://www.baeldung.com/spring-profiles

#MapStruct
https://stackoverflow.com/questions/59925679/mapstruct-how-to-make-my-method-of-mapping-from-long-to-object

#Login to mysql in DOCKER
sudo docker exec -it api_api_mysql_1 bash
mysql -h localhost -P 33307 -u api -p
show

#Grant priviliges and usage for a user in MYSQL (SAMPLE)
GRANT ALL PRIVILEGES ON user.* TO 'username'@'%' IDENTIFIED BY 'pswd';
grant all privileges on dbname.* to user@localhost identified by 'pswd';
GRANT USAGE ON *.* TO 'user'@'%' IDENTIFIED BY 'pswd'

