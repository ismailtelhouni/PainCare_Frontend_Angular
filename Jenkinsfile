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

        stage('SonarQube Analysis') {
            def scannerHome = tool 'SonarQube Scanner';
            steps {
                withSonarQubeEnv() {
                    // sh 'docker run --network=host -e SONAR_HOST_URL="http://127.0.0.1:9000" --user="$(id -u):$(id -g)" -v "$PWD:/usr/src" -v "$PWD/.sonar/cache:/opt/sonar-scanner/.sonar/cache" sonarsource/sonar-scanner-cli'
                    sh "${scannerHome}/bin/sonar-scanner"
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