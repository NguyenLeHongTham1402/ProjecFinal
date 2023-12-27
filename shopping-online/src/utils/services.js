export function getSelectedMenuKey(pathname) {
    let selectedKey;

    switch (true) {
      case pathname.startsWith('/admin/category'):
        selectedKey = '1';
        break;
      case pathname.startsWith('/admin/news'):
        selectedKey = '2';
        break;
      default:
        selectedKey = '';
    }

    return selectedKey;
}