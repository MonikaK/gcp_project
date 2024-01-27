data "google_client_config" "default" {}

# GKE cluster
resource "google_container_cluster" "primary" {
  name     = "${var.project}-gke"
  project = var.project
  location = var.region

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1


  networking_mode = "VPC_NATIVE"
  ip_allocation_policy {}

  workload_identity_config {
    workload_pool = "${var.project}.svc.id.goog"
  }
}

# Separately Managed Node Pool
resource "google_container_node_pool" "primary_nodes" {
  project    = var.project
  name       = "${google_container_cluster.primary.name}-node-pool"
  location   = var.region
  cluster    = google_container_cluster.primary.name
  node_count = 1


  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/sqlservice.admin",
      "https://www.googleapis.com/auth/devstorage.read_only",
    ]
    service_account = google_service_account.service-account.email

    labels = {
      env = var.project
    }

    preemptible  = true
    machine_type = "e2-small"
    tags         = ["gke-node"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }

  depends_on = [ helm_release.example ]

  timeouts {
    create = "20m"
  }
}