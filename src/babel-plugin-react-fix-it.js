import isReactClass from 'babel-helper-is-react-class'

const addImport = (t, path) => {
  const specifier = t.importDefaultSpecifier(t.identifier('fixIt'))
  const source = t.stringLiteral('react-fix-it')
  const importDeclaration = t.importDeclaration([specifier], source)

  path.unshiftContainer('body', importDeclaration)
}

const wrapComponent = (t, path) => {
  const callee = t.identifier('fixIt')
  const argument = t.identifier(path.node.id.name)
  const call = t.callExpression(callee, [argument])

  path.insertAfter(t.expressionStatement(call))
}

const fixIt = ({ types: t }) => ({
  visitor: {
    ClassDeclaration(path) {
      if (isReactClass(t)(path.node)) {
        addImport(t, path.parentPath)
        wrapComponent(t, path)
      }
    },
  },
})

export default fixIt
