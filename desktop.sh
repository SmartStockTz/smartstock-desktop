npm install -f
npm run build:snap
snapcraft upload --release=stable,edge,beta dist/smartstock_${PACKAGE_VERSION}_amd64.snap