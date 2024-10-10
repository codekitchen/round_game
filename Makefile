protoc:
	protoc --go_out=. api/gameserver.proto
	./web/node_modules/.bin/pbjs -t static-module -w es6 ./api/gameserver.proto -o web/src/protocol/gameserver.js
	./web/node_modules/.bin/pbts ./web/src/protocol/gameserver.js -o ./web/src/protocol/gameserver.d.ts
