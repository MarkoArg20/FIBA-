pipeline {
    agent any
    
     //triggers {
     //  cron('* * * * *')
   // }

    tools {
        nodejs 'NodeJS_18' // Use the NodeJS name from your Jenkins config
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MarkoArg20/FIBA-.git'
            }
        }

        // tuka novoto
        stage('Create .env file') {
            steps {
                withCredentials([string(credentialsId: 'dot-env-content', variable: 'DOT_ENV')]) {
                     script {
                def fixedEnv = DOT_ENV.replaceAll('\\\\n', '\n')
                writeFile file: '.env', text: fixedEnv
            }
                }
            }
        }
  // tuka novoto
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright install' 
                sh 'npx playwright test --trace on --reporter=html'
            }
        }

       // stage('Archive Results') {
//     steps {
//         junit '**/playwright-report/*.xml' // optional, if using JUnit reports
//     }
// }
    }
}
