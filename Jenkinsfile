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
                // withSonarQubeEnv('SonaQube') {
                //     sh 'docker run --network=host -e SONAR_HOST_URL="http://127.0.0.1:9000" --user="$(id -u):$(id -g)" -v "$PWD:/usr/src" -v "$PWD/.sonar/cache:/opt/sonar-scanner/.sonar/cache" sonarsource/sonar-scanner-cli'
                //     /*sh '''
                //         npm run sonar-scanner \
                //           -Dsonar.projectKey=pain-care-frontend-angular \
                //           -Dsonar.sources=src \
                //           -Dsonar.host.url=http://localhost:9000 \
                //           -Dsonar.login=sqp_d25a9c53d58d371caac73054b2c435fd83281640
                //         '''*/
                // }
                sh 'sonar-scanner \
                    -Dsonar.projectKey=pain-care-frontend-angular \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://localhost:9000 \
                    -Dsonar.token=sqp_d25a9c53d58d371caac73054b2c435fd83281640'
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