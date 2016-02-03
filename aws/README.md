Amazon Web Services

store user profiles in consistent data store, either a relational database, mariaDB or dynamoDB. USE MYSQL

RDS - if you are using a relational database
	-launch db instance
	-make sure to choose free options
	-chose dev/test version
	-db instance class (how big of a machine do you want? (chose micro db.t2.micro)
	-db instance identifier: any identifier
	-master username: (your root account for the database engine eg root)
	master password: the password you use to authenticate your db
	VPC: let sit
	VPC security group (a set of firewall settings - we need to modify this to allow for other IP addresses to connect 
	to it: create new security group
	then launch
	when it's available - grab the port number (endpoint)but this in as your host name and removie port number from the end
	use whatever master username (root) and it will prompt you for password
	-but we have to modify the security group
	-magnifying glass tab gives configuration information
	click on security group
	go to inbound tab
	click edit, add rule, chose mysql as port # will default
	cllick on source and put my ip and then save
	it warns you that you aren't connecting to something that isn't quite 
	-now we have to change the host value to the aws endpoint and then node will connect to database running on aws and not your local one
	-you need to change the host in the db-credentials file
	ec2 - launch instance
	select ubuntu server 14.04
	make sure to look for micro version
	then do review and launch
	by default creates security group to allow ssh from everywhere
	edit secuirty groups
	only ssh from current ip only
	click launch
	create a new key pair - user-auth
	download key pair
	protect the file you get the way you protect passwords. do not put it in github repo
	launch instance
	public dns is the name of our server
	click on new instance and then actions and then connect which gives you the syntax to connect to it/
	go to terminal and cs where pem files exists
	then paste in command 
	click on pem file then get info and then do chmod go-r public key name
	then do the stuff from amazaon again
	sudo apt-get update
	ssh
	ls
	cd
	"sudo bash -s" < ~/info344-class-code/aws/provision.sh
	then it's executing your provisioning script but on the aws server
	then ssh in, clone repository and start up server
	now we need our ec2 instance to talk to our rds instance
	go modify rds security group rule - mysql aurora, custom id, don't type id address. we can refer to another security group. 
	type sg-laundwizard-1?
	now do telnet to see if you get an answer. on your ec2 telnet to rds instance
	after you clone stuff
	mkdir
	cd into secret nano db-config.json
	
	go over to mysqlworkbench and config your db-config.json file to match creentials with stuff on mysqlworkbench
	npm install
	cd ..
	node server js
	
	security group for ec2 only allows for ssh
	so you have to edit secirtity group and allows for http trffic
	copy your public dns for ec2 instance and copy into web server
	
	how to run server in the background and still be able to execute commands:
	(pm2 is in the provisioning script for this directory)
	you can exit your ssh session but server will still run
	pm2 list
	pm2 start server.js
	pm2 list shows you all current things running
	pm2 stop 0
	pm2 start 0