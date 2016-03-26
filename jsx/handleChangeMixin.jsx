  var handleChangeMixin = {
            handleChange: function(key) {
                var that = this
                var newState = {}
                return function(event) {  
                    newState[key] = event.target.value
                    that.setState(newState)
                }
            }
        }