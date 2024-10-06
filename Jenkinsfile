pipeline {
    agent any


    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/ismailtelhouni/PainCare_Frontend_Angular.git', branch: 'main'
            }
        }

        stage('Install Node.js') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build Angular') {
            steps {
                script {
                    sh 'npm run build --prod'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withDockerContainer(
                    args: '--network=host -e SONAR_HOST_URL="http://127.0.0.1:9000" -v "$PWD:/usr/src"', 
                    image: 'sonarsource/sonar-scanner-cli',
                    user: '0'  // Run as root user
                ) {
                    sh "echo 'SonarQube analysis is done!'"
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}