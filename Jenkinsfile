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
                withSonarQubeEnv('SonarQube') {
                    sh 'docker run --network=host -e SONAR_HOST_URL="http://127.0.0.1:9000" -v "$PWD:/usr/src" sonarsource/sonar-scanner-cli'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    timeout(time: 1, unit: 'HOURS') {
                        def qg = waitForQualityGate()
                        print "Finished waiting"
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }
    }
}