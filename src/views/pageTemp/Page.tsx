import { Component } from "react";

class BasePage extends Component {
  pageData!: PageData;
  action!: Action;
  tableRef!: React.Ref<any>;

  init() {
    this.pageData = new PageData();
    this.action = new Action();

    // fetchAPIs(this.APIs.fetch, params).then((re) => {
    //     this.afterFetch(re);
    //     return re;
    //   });
  }

  getSearchFormComponent() {
    // const data = this.pageData.getSearchField();
    // const onSearch = () => {
    //     this.action.
    // }
    // return <form data={data} onSearch={}></form>;
  }
  getTableComponent() {
    return <table ref={this.tableRef}></table>;
  }

  render() {
    return <div></div>;
  }
}

class PageData {
  getTableCols() {
    return [];
  }
  getSearchField() {
    return [];
  }
}
class Action {
  APIs = {
    fetch: {},
    add: {},
    delete: "delete",
  };
  // fetchTable(params) {
  //   this.beforeFetch(params);
  //   // return fetchAPIs(this.APIs.fetch, params).then((re) => {
  //   //   this.afterFetch(re);
  //   //   return re;
  //   // });
  // }
  // beforeFetch(params) {}
  // afterFetch(re) {}

  getSearchField() {
    return [];
  }
}

// const Page = () => {
//   return <div></div>;
// };

export default BasePage;
