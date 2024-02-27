const path = require('path')
const { isNull } = require('./src/utils/is-null.node.js')
const { chainIdToSlug } = require('./src/mappings/chain-id.node.js')

// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}

// Create blog pages dynamically
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  const coverTemplate = path.resolve(`src/templates/cover.jsx`)
  const response = await fetch('https://api.neptunemutual.net/home/product-summary/1')

  if (!response.ok) {
    return
  }

  const result = await response.json()

  const covers = result.data.filter(coverOrProduct => {
    return isNull(coverOrProduct.productKey)
  })

  covers.forEach(cover => {
    const slugifiedName = chainIdToSlug[cover.chainId]
  
    createPage({
      path: `${slugifiedName ? `/${slugifiedName}`: ''}/covers/${cover.coverKeyString}`,
      component: coverTemplate,
      context: {
        cover: cover
      },
    })
  })
}