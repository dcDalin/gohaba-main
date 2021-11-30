# Migrating cloud to local

## Create migration

hasura migrate create init --sql-from-server --endpoint https://ficlin-dev.hasura.app --admin-secret As9rV3XKqIWALVloB3xNpCpz036p1VMr2Qn8aliUC1UYAYX3Oc0rSdlZfAjLlF67

## Apply migration to cloud skipping the ones done

hasura migrate apply --endpoint https://ficlin-dev.hasura.app --admin-secret As9rV3XKqIWALVloB3xNpCpz036p1VMr2Qn8aliUC1UYAYX3Oc0rSdlZfAjLlF67 --skip-execution --version 1637920981719

## Export metadata

hasura metadata export --endpoint https://ficlin-dev.hasura.app --admin-secret As9rV3XKqIWALVloB3xNpCpz036p1VMr2Qn8aliUC1UYAYX3Oc0rSdlZfAjLlF67

## Run docker

docker-compose up -d

- Open localhost:8080

(you may need to rename the db before apply metadata on local hasura console)

## Apply metadata

hasura metadata apply --admin-secret myadminsecretkey

## Apply migrations

hasura migrate apply --admin-secret myadminsecretkey

## Reload metadata

hasura metadata reload --admin-secret myadminsecretkey
# gohaba-main
