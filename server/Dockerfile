#
# Build stage
#
FROM maven:3.6-jdk-11 AS MAVEN_BUILD

# copy the pom and src code to the container
COPY ./ ./

# package our application code
RUN mvn clean package

FROM openjdk:8-jdk-alpine

# copy only the artifacts we need from the first stage and discard the rest
COPY --from=MAVEN_BUILD /SpringBoot-Voyage/server/target/voyage-0.0.1-SNAPSHOT.jar /app.jar

COPY uploads uploads

ENTRYPOINT ["java","-jar","/app.jar"]