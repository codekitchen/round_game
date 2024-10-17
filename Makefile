protoc:
	protoc --go_out=. api/gameserver.proto
	./web/node_modules/.bin/pbjs -t static-module -w es6 ./api/gameserver.proto -o web/src/protocol/gameserver.js
	./web/node_modules/.bin/pbts ./web/src/protocol/gameserver.js -o ./web/src/protocol/gameserver.d.ts

BINARY=roundgame_amd64

$(BINARY):
	cd web && npm run build
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o $@ .

deploy: $(BINARY)
	rsync $< ${ROUNDGAME_HOST}:/data/app/bin/roundgame
	ssh ${ROUNDGAME_HOST} "sudo systemctl restart roundgame"
	rm $<

.PHONY: $(BINARY) deploy
