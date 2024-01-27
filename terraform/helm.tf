provider "helm" {
  kubernetes {
    host                   = "https://${google_container_cluster.primary.endpoint}"
    token                  = data.google_client_config.default.access_token
    config_path = "~/.kube/config"
  }
}

resource "helm_release" "example" {
  name  = "my-cinema-app-chart"
  chart = "${path.module}/my-cinema-app-chart"

  wait = false

  depends_on = [
    google_container_cluster.primary
  ]
}