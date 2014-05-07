/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
    // Define changes to default configuration here. 
    config.language = 'en';
    
    config.toolbar = 'mToolbar';
 
    config.toolbar_mToolbar = [
        { name: 'document', items: [ 'Source' ] },
	{ name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','-','Undo','Redo' ] },
	{ name: 'insert', items : [ 'Image','Table'] },
	{ name: 'styles', items : [ 'Styles'] },
	{ name: 'basicstyles', items : [ 'Bold','Italic','-','RemoveFormat' ] },
	{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent'] },
	{ name: 'links', items : [ 'Link','Unlink','Anchor' ] }
    ];
    
    config.fontSize_sizes = "Small/12px||Medium/14px;line-height:120%||Large/33px;line-height:140%";
    //config.forcePasteAsPlainText = true;
    config.pasteFromWordRemoveFontStyles = false;
    config.pasteFromWordRemoveStyles = false;
   
};