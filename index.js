const { Octokit } = require('@octokit/rest')


class GitHubClient {
    constructor() {
      const ghClient = new Octokit({
        auth: ``
      })
  
      this.client = ghClient.rest
    }
  
    async createDeployment(deployment) {
      console.log(`Creating a new deployment in GitHub for repo ${deployment.repo}`)
      console.log(JSON.stringify(deployment))
      try {
        // if (!config.github.createDeployment) return
  
        const { data: ghDeployment } = await this.client.repos.createDeployment({
          owner: deployment.owner,
          repo: deployment.repo,
          ref: deployment.ref,
          environment: deployment.environment
        })
  
        await this.client.repos.createDeploymentStatus({
          deployment_id: ghDeployment.id,
          owner: deployment.owner,
          repo: deployment.repo,
          state: 'success'
        })
      } catch (err) {
        console.log(`Unexpected error for registering deployment status for namespace ${deployment.namespace} app ${deployment.appName}: ${err.message}`)
      }
    }
  }


  client = new GitHubClient();

  client.createDeployment({
    owner: 'igbano',
    repo: 'FizzBuzz',
    ref: 'main',
    environment: 'prod',
    namespace: '',
    appName: 'FizzBuzz',
  });


