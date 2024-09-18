pipeline {
    agent any

    environment {
        // Docker image name (use your own)
        IMAGE_NAME = "food-equeue/api"
        VERSION = '1.0'
        DOCKER_NAME = "food-equeue-api"

        // # App
        PORT=5000
        IS_DEV=true
        IS_LOCAL_NETWORK_DEPLOY=true
        CLIENT_APP_URL='http://localhost:3005'
        CLIENT_APP_LOCAL_NETWORK_URL='http://192.168.100.11:3005'

        // # DB
        DB_HOST='myHost'
        DB_PORT=5432

        DB_USER='test'
        DB_PASSWORD='test'
    }

    stages {
        stage('Clone GitHub Repo') {
            steps {
                // Check out the code from GitHub (public repository)
                git branch: 'master', url: 'https://github.com/vladiusovich/food-equeue-api.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // sh 'docker build -t ${IMAGE_NAME}:${VERSION}.${BUILD_NUMBER} .'
                    sh 'docker build -t ${IMAGE_NAME}:${VERSION}.${BUILD_NUMBER} .'
                }
            }
        }

        stage('Save Docker Image to workspace') {
            steps {
                sh 'echo "Cleanup the workspace"'
                sh 'rm -rf .[!.]* *'
                sh 'echo "Save docker img"'
                sh 'mkdir img'
                sh 'docker save --output $WORKSPACE/img/${DOCKER_NAME}.${VERSION}.${BUILD_NUMBER}.tar ${IMAGE_NAME}:${VERSION}.${BUILD_NUMBER}'
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Check if the container is running and stop it
                    sh 'echo "Stop current container"'
                    sh '''
                        if [ $(docker ps -q -f name=${DOCKER_NAME}) ]; then
                            docker kill ${DOCKER_NAME}
                            docker rm -f ${DOCKER_NAME}
                        fi
                    '''

                    // sh 'docker rm ${DOCKER_NAME}'
                    sh 'echo "Run new build"'
                    sh 'docker run -d -p ${APP_PORT}:3000 --name ${DOCKER_NAME} -v sqlite_data:/usr/src/app/db ${IMAGE_NAME}:${VERSION}.${BUILD_NUMBER}'
                }
            }
        }
    }

    // post {
    //     always {
    //         // Clean up the Docker container after the build process
    //         script {
    //             sh 'docker rm -f ${IMAGE_NAME}:${VERSION} || true'
    //             sh 'docker rmi ${IMAGE_NAME}:${VERSION} || true'
    //         }
    //     }
    // }
}
