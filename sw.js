
const tree = navObj.querySelectorAll('li')
var lengthOfTree = tree.length

while (lengthOfTree > state.pageLength) {
    tree.removeChild(tree.firstElementChild)
    lengthOfTree = tree.length
}


