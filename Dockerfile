  ### Dockerfile ###
  ### Simple Docker Deployment

 # BASE IMAGE
  FROM node:alpine

  WORKDIR /usr/src/app


  COPY . .

  EXPOSE 8080

  RUN npm install -g @angular/cli
  RUN npm install

  CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8080"]

  # Run this command: docker build -t <username>/mortgage-repayment:latest . (make sure that you are in program folder inside your CLI)
  # To run the image do this: docker run -p 8080:8080  -name mortgage-repayment <username>/mortgage-repayment:latest

  ### Kubernetes ###

  # push your image with docker push <your-username>/mortgage-repayment-image
  # make sure to use your image in deployment.yaml and service.yaml
  # run kubectl apply -f deployment.yaml
  # run kubectl apply -f service.yaml
  # to see if your deployment is working write: kubectl get deployments and it should be status 1/1
