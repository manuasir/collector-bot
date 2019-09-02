# Ingesting bot logs into Elasticsearch

### Ingest pipeline (Elasticsearch + Kibana v7.3.1)

```
PUT _ingest/pipeline/collector-bot-ingest
{

  "version": 2,
  "description": "Ingest pipeline for collector-bot logs",
  "processors": [
    {
      "dissect": {
        "field": "message",
        "pattern": "%{@timestamp} - %{level} - %{user} - %{userId} - %{action} - %{messageType} - %{full_log} - %{group}",
        "if": "ctx.source == '/home/pi/.pm2/logs/bot-out.log'",
        "on_failure": [
          {
            "drop": {}
          }
        ]
      }
    },
    {
      "remove": {
        "if": "ctx.source == '/home/pi/.pm2/logs/bot-out.log'",
        "field": "beat"
      }
    },
    {
      "remove": {
        "if": "ctx.source == '/home/pi/.pm2/logs/bot-out.log'",
        "field": "prospector"
      }
    },
    {
      "remove": {
        "if": "ctx.source == '/home/pi/.pm2/logs/bot-out.log'",
        "field": "offset"
      }
    }
  ]
}
```

### Filebeat configuration (Filebeat 6.2.2)

```yml
filebeat.prospectors:
  - type: log
    paths:
      - /home/pi/.pm2/logs/bot-out.log
setup.template.enabled: false
output.elasticsearch:
  pipeline: 'collector-bot-ingest'
  hosts: ['http://<elastic_IP>:9200']
```

### Elasticsearch index template

```json
PUT _template/es-bot
{
  "order": 0,
  "index_patterns": [
    "filebeat-*"
  ],
  "settings": {
    "index.refresh_interval": "30s",
    "index.number_of_shards": "1",
    "index.number_of_replicas": "0"
  },
  "mappings": {
    "properties": {
      "source": {
        "type": "keyword"
      },
      "level": {
        "type": "keyword"
      },
      "message": {
        "type": "keyword"
      },
      "userId": {
        "type": "long"
      },
      "full_log": {
        "type": "keyword"
      },
      "@timestamp": {
        "type": "date"
      },
      "messageType": {
        "type": "keyword"
      },
      "action": {
        "type": "keyword"
      },
      "user": {
        "type": "keyword"
      },
      "group": {
        "type": "keyword"
      }
    }
  }
}
```
