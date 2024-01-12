provider "helm" {
  kubernetes {
    host                   = "https://${google_container_cluster.primary.endpoint}"
    token                  = data.google_client_config.default.access_token
    config_path = "~/.kube/config"
  }
}

resource "helm_release" "example" {
  name       = "my-redis-release"
  chart = "https://charts.bitnami.com/bitnami/redis-10.7.16.tgz"
  version    = "6.0.1"

  set {
    name  = "cluster.enabled"
    value = "true"
  }

  set {
    name  = "metrics.enabled"
    value = "true"
  }

  set {
    name  = "service.annotations.prometheus\\.io/port"
    value = "9127"
    type  = "string"
  }

#   name  = "my-local-chart"
#   chart = "./helm"

  depends_on = [
    google_container_cluster.primary
  ]
}