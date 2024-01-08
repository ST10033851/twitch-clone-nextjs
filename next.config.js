/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "utfs.io"
        ]
    }
}

module.exports = nextConfig

//webpack: (config) => {cong.modules.rules.push(test: /\.mjs$/, include: /node_modules/, type: "javascript/auto"}) return config