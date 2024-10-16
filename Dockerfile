FROM golang:1.23.2-bookworm AS gobuild

WORKDIR /usr/src/app

# prebuild for faster subsequent builds
RUN CGO_ENABLED=0 go install -v std

COPY go.mod go.sum ./
RUN go mod download

COPY *.go ./
COPY internal ./internal
RUN CGO_ENABLED=0 go build -v -o /usr/local/bin/app .

FROM node:22.9.0-bookworm AS webbuild

WORKDIR /usr/src/app/web

COPY web .
RUN npm install -y
RUN npm run build

FROM gcr.io/distroless/static-debian12 AS final

EXPOSE 8080

WORKDIR /usr/local/bin
COPY --from=gobuild /usr/local/bin/app ./app
COPY --from=webbuild /usr/src/app/web/dst ./web/dst

CMD ["./app", "0.0.0.0:8080"]
