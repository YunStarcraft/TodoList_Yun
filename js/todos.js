var Todos = {};

Todos.Model = Backbone.Model.extend({

});

Todos.View = Backbone.View.extend({
    initialize: function () {
        var that = this;
		
		
        this.model.on('change:itemCount', function () {
		
		console.log(that);
		console.log(that.model);
		console.log(this);
		console.log(this.model);
		console.log(that.model==this);
		console.log(that.model===this);
          //  var itemCount = that.model.get('itemCount');
           var itemCount = this.get('itemCount'); 
		console.log(itemCount);
			if (itemCount === 0 && $('#todo-list li').length === 0) {
                $('footer').hide();
            }
            else {
                $('footer').show();
                $('#itemCount').text($('#todo-list li:not(.done)').length);
            }
        });
        this.model.on('change:completionCount', function () {
            var completionCount = that.model.get('completionCount');
            if (completionCount === 0) {
                $('#clear-completed').hide();
                $('#toggle-all').attr('checked', false);
            }
            else {
                $('#clear-completed').show();
                $('#completionCount').text($('#todo-list li.done').length);
            }
        });
    },
    events: {
        'keydown #new-todo': 'addNewTodo',
        'mouseover li': 'showX',
        'click .destroy': 'deleteItem',
        'click input.toggle': 'toggleCompletion',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAll',
        'dblclick .itemName': 'editItem',
        'focusout .edit': 'completeEditing',
		'click h1': 'test',
		
    },

    test: function (e) {
        alert('This is a test!');
		
    },
    addNewTodo: function (e) {
        if (e.keyCode === 13 && $.trim($(e.currentTarget).val()).length !== 0) {
            var value = $.trim($(e.currentTarget).val());
            var newItem = '<li class=""><div class="view"><input class="toggle" type="checkbox"><label class="itemName">' + value + '</label><a class="destroy"></a></div><input class="edit" type="text" value="' + value + '"></li>';
            $('#todo-list').append(newItem);
            $('footer').show();
            this.model.set('itemCount', $('#todo-list li:not(.done)').length);
            $(e.currentTarget).val('');
            $('#toggle-all').attr('checked', false);
        }
    },
    showX: function (e) {
        $(e.currentTarget).children('div').children('a').show();
    },
    deleteItem: function (e) {
        $(e.currentTarget).parent().parent().remove();
        this.model.set('itemCount', $('#todo-list li:not(.done)').length);
        this.model.set('completionCount', $('#todo-list li.done').length);
    },
    toggleCompletion: function (e) {
        if($(e.currentTarget).is(':checked')){
            $(e.currentTarget).parent().parent().addClass('done');
        }
        else {
            $(e.currentTarget).parent().parent().removeClass('done');
        }
        this.model.set('completionCount', $('#todo-list li.done').length);
        this.model.set('itemCount', $('#todo-list li:not(.done)').length);
    },
    clearCompleted: function (e) {
        e.preventDefault();
        $('#todo-list li.done').remove();
        this.model.set('completionCount', $('#todo-list li.done').length);
        this.model.set('itemCount', $('#todo-list li:not(.done)').length);
        if ($('#todo-list li:not(.done)').length === 0) {
            $('footer').hide();
        }
    },
    toggleAll: function (e) {
        if ($(e.currentTarget).is(':checked')) {
            $('#todo-list li').addClass('done');
        }
        else {
            $('#todo-list li').removeClass('done');
        }
        $('input.toggle').click();
        this.model.set('completionCount', $('#todo-list li.done').length);
        this.model.set('itemCount', $('#todo-list li:not(.done)').length);
    },
    editItem: function (e) {
        $(e.currentTarget).parent().parent().addClass('editing');
    },
    completeEditing: function (e) {
        var value = $.trim($(e.currentTarget).val());
        $(e.currentTarget).attr('value', value);
        $(e.currentTarget).siblings('div').children('label.itemName').text(value);
        $(e.currentTarget).parent().removeClass('editing');
    },
});

$(document).ready(function () {
    var todosView = new Todos.View({ model: new Todos.Model, el: '#todoapp' });

});