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
                script {
                    def scannerHome = tool 'SonarScanner';
                    withSonarQubeEnv('SonarQube') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=pain-care-frontend-angular \
                            -Dsonar.host.url=http://localhost:9000 \
                            -Dsonar.login=sqp_ebb1492d94255f87b2147b8ca71d4a0ba655c91a \
                            -Dsonar.sources=src \
                            -Dsonar.exclusions="**/node_modules/**"
                        """
                    }
                }
            }
        }

        // stage('SonarQube Analysis') {
        //     steps {
        //         withSonarQubeEnv('SonarQube') {
        //             sh 'docker run --network=host -e SONAR_HOST_URL="http://127.0.0.1:9000" -v "$PWD:/usr/src" sonarsource/sonar-scanner-cli'
        //         }
        //     }
        // }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Email Sent') {
            steps{
                sh 'swaks --to ismailtelhouni123@gmail.com \
                    --from "chakra.hs.business@gmail.com" \
                    --server "smtp.gmail.com" \
                    --port "587" \
                    --auth PLAIN \
                    --auth-user "chakra.hs.business@gmail.com" \
                    --auth-password "pnuw lgzu ofkv oyoq" \
                    --helo "localhost" \
                    --tls \
                    --data "Subject: Sonar Subject Test\n\nSalam Ismail from CLI"'
            }
        }
    }
}