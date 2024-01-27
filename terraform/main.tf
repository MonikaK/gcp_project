 terraform {
   required_providers {
     google = {
       source  = "hashicorp/google"
       version = "4.11.0"
     }
   }
 }

 provider "google" {
     project     = var.project
     region      = var.region
 }

 resource "google_sql_database_instance" "my_db_instance" {
   name             = "postgresql-instance"
   database_version = "POSTGRES_15"
   region = var.region

   settings {
     tier = "db-f1-micro"
   }

   deletion_protection = false
 }

 resource "google_sql_database" "db" {
   instance = google_sql_database_instance.my_db_instance.name
   name = "cinema-app"
 }

 resource "google_project_service" "compute" {
   ## Needed to deploy Compute Engine services
   project            = var.project
   service            = "compute.googleapis.com"
   disable_on_destroy = false
 }

 resource "google_project_service" "container" {
   ## Needed to deploy Compute Engine services
   project            = var.project
   service            = "container.googleapis.com"
   disable_on_destroy = false
 }

 resource "google_pubsub_topic" "topic" {
   name = "reservation-topic"
   project = var.project
 }

 provider "kubernetes" {
   host = "https://${google_container_cluster.primary.endpoint}"
   token = data.google_client_config.default.access_token
   cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth.0.cluster_ca_certificate)
 }

 resource "google_service_account" "service-account" {
   account_id   = "cinema-account"
 }

 resource "google_project_iam_member" "binding" {
   for_each = toset([ "roles/pubsub.editor", "roles/cloudsql.editor", "roles/storage.objectViewer"])
   role = each.key
   member = "serviceAccount:${google_service_account.service-account.email}"
   project = var.project
 }

 module "my-app-workload-identity" {
   source              = "terraform-google-modules/kubernetes-engine/google//modules/workload-identity"
   use_existing_gcp_sa = true
   name                = google_service_account.service-account.account_id
   project_id          = var.project

   depends_on = [google_service_account.service-account]
 }