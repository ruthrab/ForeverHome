# Furever Home

# _User and Installation Guide_

**By: Group 15**

Bailey Ralston

Binfang Ye

Brian D. Ruthrauff

Rui Dai

1. **Introduction**

Furever Home is a Node.js based web application designed to allow animal shelters and families looking to adopt a pet a place where they find each other.  Animal shelters can publicize the animals they currently have that are looking for homes.  Users meanwhile can browse and filter the list of all animals on the site to help find the one that is a match for them.

2. **Installation and Build Guide Details**

1. log into ceclnx01.cec.miamioh.edu with the SSH client of your choice
2. Navigate to the directory you would like to install Furever home in.
  1. For example, typing &quot;cd ~&quot; will take you to your home directory for the install.
  2. This can be verified by typing &quot;pwd&quot; and the results should be /home/&lt;your user id&gt;
3. Download Furever Home by entering the following command in to the command line
git clone [https://github.com/ruthrab/FureverHome.git](https://github.com/ruthrab/FureverHome.git)
4. Once the download is done enter the next command to change your working directory
cd FureverHome/ForeverHome/webapp/fureverhome
5. Enter the following command to install the some of the additional required software
npm install --no-option
6. Now the site has been downloaded and is ready to run
7. Make sure your working directory is the fureverhome directory.
If you used the home directory in step **B** the directory will be ~/FureverHome/ForeverHome/webapp/fureverhome
8. To start the site, enter the following command.
node app.js
9. The website can now be found at [http://ceclnx01.cec.miamioh.edu:1337/](http://ceclnx01.cec.miamioh.edu:1337/)

3. **User&#39;s Guide**

- To register a new user as a shelter, click the login in link in the top right of the page. Then select the &quot;Register&quot; link.
- Make sure you select the option that the account is for a shelter
- Next you will be asked to enter the shelters name and contact information once that is done click &quot;Submit&quot;

- While logged in as a shelter to add a pet click on the &quot;Add a Pet&quot; button on the profile page
- Enter in the information for the pet and click the &quot;Submit&quot; button to add the pet
- While logged in as a shelter you can see a list of all the pets in that shelter. To change any of the information about that pet click the edit button for that pet. To remove the pet from the site click the &quot;Delete&quot; button for that pet.

- To register a new user account, click the login in link in the top right of the page. Then select the &quot;Register&quot; link.
- Enter in the requested information.

- While looking at the list of pets users can click on the type, size and gender of the pet to limit the list to just those pets or click All to see the full list

- Users can click the &quot;Favorite&quot; button on a pet to add it to their saved list of Favorite pets Likewise clicking on &quot;Unfavorite&quot; will remove the pet from the favorite list

- To send a link to someone click the view button for the pet and then copy the address from the browser&#39;s address bar and send it to someone that might want to adopt that pet.

4. **Gallery Maintenance**

- To make updates make the fureverhome directory from step G in the install the working directory then type &quot;git pull&quot; in the command line.
- Then type the following command to install any other needed packages
npm install --no-option

- To configure the look of the site knowledge of HTML, CSS, and JavaScript are must.
- To make changes to the look and feel of the site changes can be made to the layout.ejs file located in the views folder
- Making changes to the various other .ejs files will change the look of those features.  For example homepage.ejs edits will change the look of the homepage while. Editing the register.ejs file in the user folder will change the look of user registration.

5. **Known Issues and Vulnerabilities**

- There is no way to change an account type from a user account to a shelter account
- There is no way to change an account type from a shelter account to a user account
- The site does not support image uploads so images for pet will need to be stored on separate site that can host images and a link to that image will be used in the pet information.
