(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/components/Profile.js":
/*!***********************************!*\
  !*** ./src/components/Profile.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./service */ "./src/components/service.js");
/* harmony import */ var _SinglePost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SinglePost */ "./src/components/SinglePost.js");
/* harmony import */ var _redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../redux */ "./src/redux/index.js");







function Profile() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  var postForm = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var profileSrc = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var resetPostForm = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var fileForm = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var user = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return state.userState.userData.user;
  });
  var imgData = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return state.userState.userData.imgData;
  });

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      components = _useState2[0],
      setComponents = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])('data:image/png;base64,' + imgData),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      userImage = _useState4[0],
      setUserImage = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    dispatch(Object(_redux__WEBPACK_IMPORTED_MODULE_5__["start"])());
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    setUserImage('data:image/png;base64,' + imgData);
  }, [imgData]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    Object(_service__WEBPACK_IMPORTED_MODULE_3__["fetchPostData"])("", user).then(function (response) {
      var tempComponents = response.map(function (element) {
        var conditionalData = {
          img: null,
          height: '9vw'
        };

        if (element.img.data !== null) {
          conditionalData.img = 'data:image/png;base64,' + element.img.data;
          conditionalData.height = '24.7vw';
        }

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_SinglePost__WEBPACK_IMPORTED_MODULE_4__["default"], {
          key: element._id,
          id: element._id,
          user: element.name,
          content: element.content,
          imgData: conditionalData
        });
      });
      setComponents(tempComponents);
    })["catch"](function (error) {
      console.log(error);
    });
  }, [user]);

  var submitButton = function submitButton(e) {
    e.preventDefault();
    var postUrl = "http://localhost:8000/addUser/?update=yes&user=" + user;
    var formData = new FormData(postForm.current);
    var postObject = {
      method: 'POST',
      body: formData
    };

    if (fileForm.current.value !== "") {
      fetch(postUrl, postObject).then(function (response) {
        if (response.ok) {
          resetPostForm.current.click();
          Object(_service__WEBPACK_IMPORTED_MODULE_3__["fetchUser"])(user).then(function (response) {
            dispatch(Object(_redux__WEBPACK_IMPORTED_MODULE_5__["uploadImage"])(response[0].img.data));
            setUserImage('data:image/png;base64,' + response[0].img.data);
          })["catch"](function (error) {
            console.log(error);
          });
        }
      })["catch"](function (error) {
        console.log(error);
      });
    }
  };

  var handleUndo = function handleUndo(e) {
    e.preventDefault();
    dispatch(Object(_redux__WEBPACK_IMPORTED_MODULE_5__["undo"])());
  };

  var handleRedo = function handleRedo(e) {
    e.preventDefault();
    dispatch(Object(_redux__WEBPACK_IMPORTED_MODULE_5__["redo"])());
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cover-photo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: __webpack_require__(/*! ../images/post.jpg */ "./src/images/post.jpg")["default"],
    className: "image-in-div",
    alt: "userimage"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "profile-photo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: userImage,
    className: "image-in-div",
    style: {
      borderRadius: '50%'
    },
    alt: "profileimage",
    ref: profileSrc
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "user-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, user)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "content",
    style: {
      paddingTop: '0vw'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    id: "profilePicture",
    ref: postForm
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    onClick: handleUndo
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "fa fa-undo"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    onClick: handleRedo
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "fa fa-repeat"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "file",
    id: "myfile",
    name: "myfile",
    ref: fileForm
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "submit",
    id: "submitPost",
    onClick: submitButton
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "reset",
    value: "reset",
    style: {
      display: 'none'
    },
    ref: resetPostForm
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "posts"
  }, components)));
}

/* harmony default export */ __webpack_exports__["default"] = (Profile);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Qcm9maWxlLmpzIl0sIm5hbWVzIjpbIlByb2ZpbGUiLCJkaXNwYXRjaCIsInVzZURpc3BhdGNoIiwicG9zdEZvcm0iLCJ1c2VSZWYiLCJwcm9maWxlU3JjIiwicmVzZXRQb3N0Rm9ybSIsImZpbGVGb3JtIiwidXNlciIsInVzZVNlbGVjdG9yIiwic3RhdGUiLCJ1c2VyU3RhdGUiLCJ1c2VyRGF0YSIsImltZ0RhdGEiLCJ1c2VTdGF0ZSIsImNvbXBvbmVudHMiLCJzZXRDb21wb25lbnRzIiwidXNlckltYWdlIiwic2V0VXNlckltYWdlIiwidXNlRWZmZWN0Iiwic3RhcnQiLCJmZXRjaFBvc3REYXRhIiwidGhlbiIsInJlc3BvbnNlIiwidGVtcENvbXBvbmVudHMiLCJtYXAiLCJlbGVtZW50IiwiY29uZGl0aW9uYWxEYXRhIiwiaW1nIiwiaGVpZ2h0IiwiZGF0YSIsIl9pZCIsIm5hbWUiLCJjb250ZW50IiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwic3VibWl0QnV0dG9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwicG9zdFVybCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJjdXJyZW50IiwicG9zdE9iamVjdCIsIm1ldGhvZCIsImJvZHkiLCJ2YWx1ZSIsImZldGNoIiwib2siLCJjbGljayIsImZldGNoVXNlciIsInVwbG9hZEltYWdlIiwiaGFuZGxlVW5kbyIsInVuZG8iLCJoYW5kbGVSZWRvIiwicmVkbyIsInJlcXVpcmUiLCJib3JkZXJSYWRpdXMiLCJwYWRkaW5nVG9wIiwiZGlzcGxheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLE9BQVQsR0FBb0I7QUFDaEIsTUFBTUMsUUFBUSxHQUFHQywrREFBVyxFQUE1QjtBQUNBLE1BQU1DLFFBQVEsR0FBR0Msb0RBQU0sQ0FBQyxJQUFELENBQXZCO0FBQ0EsTUFBTUMsVUFBVSxH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QUFTLEVBQUMsY0FGZDtBQUdJLFNBQUssRUFBRTtBQUFDeUMsa0JBQVksRUFBRTtBQUFmLEtBSFg7QUFJSSxPQUFHLEVBQUMsY0FKUjtBQUtJLE9BQUcsRUFBRXJEO0FBTFQsSUFESixDQUpKLGVBYUk7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDSSx5RUFBT0csSUFBUCxDQURKLENBYkosZUFnQkk7QUFBSyxhQUFTLEVBQUMsU0FBZjtBQUF5QixTQUFLLEVBQUU7QUFBQ21ELGdCQUFVLEVBQUU7QUFBYjtBQUFoQyxrQkFDSTtBQUFNLE1BQUUsRUFBQyxnQkFBVDtBQUEwQixPQUFHLEVBQUV4RDtBQUEvQixrQkFDSTtBQUFRLFdBQU8sRUFBRWtEO0FBQWpCLGtCQUE2QjtBQUFHLGFBQVMsRUFBQztBQUFiLElBQTdCLENBREosZUFFSTtBQUFRLFdBQU8sRUFBRUU7QUFBakIsa0JBQTZCO0FBQUcsYUFBUyxFQUFDO0FBQWIsSUFBN0IsQ0FGSixlQUdJO0FBQU8sUUFBSSxFQUFDLE1BQVo7QUFBbUIsTUFBRSxFQUFDLFFBQXRCO0FBQStCLFFBQUksRUFBQyxRQUFwQztBQUE2QyxPQUFHLEVBQUVoRDtBQUFsRCxJQUhKLGVBSUk7QUFBTyxRQUFJLEVBQUMsUUFBWjtBQUFxQixNQUFFLEVBQUMsWUFBeEI7QUFBcUMsV0FBTyxFQUFFOEI7QUFBOUMsSUFKSixlQUtJO0FBQU8sUUFBSSxFQUFDLE9BQVo7QUFBb0IsU0FBSyxFQUFDLE9BQTFCO0FBQWtDLFNBQUssRUFBRTtBQUFDdUIsYUFBTyxFQUFFO0FBQVYsS0FBekM7QUFBNEQsT0FBRyxFQUFFdEQ7QUFBakUsSUFMSixDQURKLGVBUUk7QUFBSyxhQUFTLEVBQUM7QUFBZixLQUNLUyxVQURMLENBUkosQ0FoQkosQ0FESjtBQStCSDs7QUFFY2Ysc0VBQWYsRSIsImZpbGUiOiIwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVNlbGVjdG9yLCB1c2VEaXNwYXRjaCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IHsgZmV0Y2hQb3N0RGF0YSwgZmV0Y2hVc2VyIH0gZnJvbSBcIi4vc2VydmljZVwiO1xuaW1wb3J0IFNpbmdsZVBvc3QgZnJvbSBcIi4vU2luZ2xlUG9zdFwiO1xuaW1wb3J0IHsgdXBsb2FkSW1hZ2UsIHVuZG8sIHJlZG8sIHN0YXJ0IH0gZnJvbSBcIi4uL3JlZHV4XCI7IFxuXG5mdW5jdGlvbiBQcm9maWxlICgpIHtcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG4gICAgY29uc3QgcG9zdEZvcm0gPSB1c2VSZWYobnVsbCk7XG4gICAgY29uc3QgcHJvZmlsZVNyYz0gdXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IHJlc2V0UG9zdEZvcm0gPSB1c2VSZWYobnVsbCk7XG4gICAgY29uc3QgZmlsZUZvcm0gPSB1c2VSZWYobnVsbCk7XG4gICAgY29uc3QgdXNlciA9IHVzZVNlbGVjdG9yKHN0YXRlID0+IHN0YXRlLnVzZXJTdGF0ZS51c2VyRGF0YS51c2VyKTtcbiAgICBjb25zdCBpbWdEYXRhID0gdXNlU2VsZWN0b3Ioc3RhdGUgPT4gc3RhdGUudXNlclN0YXRlLnVzZXJEYXRhLmltZ0RhdGEpO1xuICAgIGNvbnN0IFtjb21wb25lbnRzLCBzZXRDb21wb25lbnRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbdXNlckltYWdlLCBzZXRVc2VySW1hZ2VdID0gdXNlU3RhdGUoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnICsgaW1nRGF0YSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goc3RhcnQoKSk7XG4gICAgfSwgW10pXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc2V0VXNlckltYWdlKCdkYXRhOmltYWdlL3BuZztiYXNlNjQsJyArIGltZ0RhdGEpO1xuICAgIH0sIFtpbWdEYXRhXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hQb3N0RGF0YShcIlwiLCB1c2VyKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wQ29tcG9uZW50cyA9IHJlc3BvbnNlLm1hcChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbmRpdGlvbmFsRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzl2dydcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaW1nLmRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbmFsRGF0YS5pbWcgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcgKyBlbGVtZW50LmltZy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxEYXRhLmhlaWdodCA9ICcyNC43dncnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoPFNpbmdsZVBvc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZWxlbWVudC5faWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZD17ZWxlbWVudC5faWR9XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyPXtlbGVtZW50Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtlbGVtZW50LmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWdEYXRhPXtjb25kaXRpb25hbERhdGF9XG4gICAgICAgICAgICAgICAgICAgIC8+KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZXRDb21wb25lbnRzKHRlbXBDb21wb25lbnRzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9LCBbdXNlcl0pO1xuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHBvc3RVcmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hZGRVc2VyLz91cGRhdGU9eWVzJnVzZXI9XCIgKyB1c2VyO1xuICAgICAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEocG9zdEZvcm0uY3VycmVudCk7XG4gICAgICAgIGNvbnN0IHBvc3RPYmplY3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgICAgIH07XG4gICAgICAgIGlmIChmaWxlRm9ybS5jdXJyZW50LnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBmZXRjaChwb3N0VXJsLCBwb3N0T2JqZWN0KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRQb3N0Rm9ybS5jdXJyZW50LmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaFVzZXIodXNlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaCh1cGxvYWRJbWFnZShyZXNwb25zZVswXS5pbWcuZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRVc2VySW1hZ2UoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnICsgcmVzcG9uc2VbMF0uaW1nLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7IFxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGhhbmRsZVVuZG8gPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRpc3BhdGNoKHVuZG8oKSk7XG4gICAgfVxuICAgIGNvbnN0IGhhbmRsZVJlZG8gPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRpc3BhdGNoKHJlZG8oKSk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvdmVyLXBob3RvXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9e3JlcXVpcmUoXCIuLi9pbWFnZXMvcG9zdC5qcGdcIikuZGVmYXVsdH0gY2xhc3NOYW1lPVwiaW1hZ2UtaW4tZGl2XCIgYWx0PVwidXNlcmltYWdlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlLXBob3RvXCI+XG4gICAgICAgICAgICAgICAgPGltZyBcbiAgICAgICAgICAgICAgICAgICAgc3JjPXt1c2VySW1hZ2V9IFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbWFnZS1pbi1kaXZcIiBcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tib3JkZXJSYWRpdXM6ICc1MCUnfX0gXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cInByb2ZpbGVpbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgIHJlZj17cHJvZmlsZVNyY31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXItdGV4dFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPnt1c2VyfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCIgc3R5bGU9e3twYWRkaW5nVG9wOiAnMHZ3J319PlxuICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwicHJvZmlsZVBpY3R1cmVcIiByZWY9e3Bvc3RGb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVVbmRvfT48aSBjbGFzc05hbWU9XCJmYSBmYS11bmRvXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVJlZG99PjxpIGNsYXNzTmFtZT1cImZhIGZhLXJlcGVhdFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJteWZpbGVcIiBuYW1lPVwibXlmaWxlXCIgcmVmPXtmaWxlRm9ybX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cInN1Ym1pdFBvc3RcIiBvbkNsaWNrPXtzdWJtaXRCdXR0b259IC8+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmVzZXRcIiB2YWx1ZT1cInJlc2V0XCIgc3R5bGU9e3tkaXNwbGF5OiAnbm9uZSd9fSByZWY9e3Jlc2V0UG9zdEZvcm19IC8+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdHNcIj5cbiAgICAgICAgICAgICAgICAgICAge2NvbXBvbmVudHN9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZTsiXSwic291cmNlUm9vdCI6IiJ9