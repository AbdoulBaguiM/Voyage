FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
COPY uploads uploads
ENTRYPOINT ["java","-jar","/app.jar"]