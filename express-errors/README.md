```bash
npm install
npm link <node_agent>
node index.js
node index.js | bunyan -c '["streaming_span_event_aggregator", "span-streamer"].indexOf(this.component) >= 0'
seq 10000 | parallel -v "curl -s localhost:8000"
```
