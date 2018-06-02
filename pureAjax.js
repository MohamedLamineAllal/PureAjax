let PureAjax = function () {
    this.ajax = function (ajaxObj) {
        let that = this;
        let url = null;
        if (ajaxObj.hasOwnProperty('url')) {
            url = ajaxObj.url;
        } 
    
        let ajaxDefault = {
            url: url,
            data: null,
            /**
                            {
                                key: value, 
                                key2: value2
                            }
                        */
            method: 'POST',
            type: null, // contentType
            responseType: null,
            headers: null,
            /**
                        {
                            'headerName': 'value',
                            'User-Agent': ,
                            'Content-Type'
                        }
                        */
            async: true,
            success: null,
            /**
                            callback format :  callback(xhr, response)
                        */
            error: null
                /**
                                callback format : callback(xhr, response)
                            */
                ,
            complete: null
                /**
                    callback format : callback(xhr, response)
                */
                ,
            events: null
            /**
                {
                    eventName: callback,
                    eventNAME: CALLback
                }
            */
        }
    
        ajaxObj = Object.assign({}, ajaxDefault, ajaxObj);
    
        let xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState < 4) {
                //handle preload 
                return;
            }
    
            if (ajaxObj.complete) {
                ajaxObj.complete(xhr);
            }
    
            if (xhr.status !== 200) {
                // here go handling error
                if (ajaxObj.error) {
                    ajaxObj.error(xhr, xhr.status);
                }
    
                return;
            }
    
            if (xhr.readyState === 4) {
                // handling success
                if (ajaxObj.success) {
                    ajaxObj.success(xhr, that.ajax_readResponse(xhr));
                }
            }
        }
    
        // set events handlers if provided
        if (ajaxObj.events) {
            for (let eventName in ajaxObj.events) {
                xhr.addEventListener(eventName, ajaxObj.events[eventName]);
            }
        }
    
    
        xhr.open(ajaxObj.method, ajaxObj.url, ajaxObj.async);
    
        //set type header
        if(ajaxObj.type) {
            xhr.setRequestHeader('Content-Type', ajaxObj.type);
        }
    
        // set all other headers
        if (ajaxObj.headers) {
            if (ajaxObj.headers.hasOwnProperty('Content-Type')) {
                delete ajaxObj.headers['Content-Type'];
            }
    
            for (let headerName in ajaxObj.headers) {
                xhr.setRequestHeader(headerName, ajaxObj.headers[headerName]);
            }
        }
    
        // set response type
        if (ajaxObj.responseType) {
            xhr.responseType = ajaxObj.responseType;
        }
    
        // format data to be sent if there is
        let formatedData = null;
    
        if (ajaxObj.data) {
            formatedData = this.ajax_formatData(ajaxObj.type, ajaxObj.data);
        }
    
        xhr.send(formatedData);
    }  
     
    this.ajax_urlEncType = function () {
        return 'application/x-www-form-urlencoded';
    }
    
    this.ajax_formdataType = function () {
        return 'application/form-data';
    }
    
    this.ajax_jsonType = function () {
        return 'application/json';
    }
    
    this.ajax_formatData = function (type, data) {
        let formatedData;
        if (type === 'application/json') {
            formatedData = JSON.stringify(data);
        } else if (type === 'application/x-www-form-urlencoded') {
            formatedData = this.paramToUrlEncoded(data);
        } else if (type === 'application/form-data') {
            let fd = new FormData();
            for (let name in data) {
                fd.append(name, data[name]);
            }
            formatedData = fd;
        } else {
            formatedData = data;
        }
    
        return formatedData;
    }
    
    this.ajax_readResponse = function (xhr) {
        var data;
        if (!xhr.responseType || xhr.responseType === "text") {
            data = xhr.responseText;
        } else if (xhr.responseType === "document") {
            data = xhr.responseXML;
        } else {
            data = xhr.response;
        }
        return data;
    }
    
    this.ajax_errorTextFromStatus = function (status) {
        switch (status) {
            case 404:
                return 'File not found (error 404)';
                break;
            case 500:
                return 'Server error (error 500)';
                break;
            case 0:
                return 'Request aborted (error 0)';
                break;
            default:
                return 'Unknown error' + status;
        }
    }
    
    this.paramToUrlEncoded = function (object) {
        var encodedString = '';
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                encodedString += encodeURI(prop + '=' + object[prop]);
            }
        }
        return encodedString;
    }
}





