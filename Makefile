build :
		docker build -t socket-test:latest ./
run :
		docker run -p 3000:3000 -d socket-test:latest
