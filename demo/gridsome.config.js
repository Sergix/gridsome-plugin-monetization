// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Gridsome",
  plugins: [
    {
      use: "gridsome-monetization",
      options: {
        paymentPointer: "$ilp.uphold.com/8bJBkDmJDw4R",
        global: false,
      },
    },
  ],
}
